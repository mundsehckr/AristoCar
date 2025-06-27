"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dipxp0wz5";
const CLOUDINARY_UPLOAD_PRESET = "car-listings";

type Listing = {
  _id: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin?: string;
  title?: string;
  description?: string;
  conditionDescription?: string;
  pincode: string;
  keyFeatures?: string[];
  overallCondition?: string;
  damageAssessment?: string;
  suggestedPrice?: number;
  marketAnalysis?: string;
  photoUrls: string[];
  status?: string;
};

export default function EditListingPage({ params }: { params: { listingId: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listing, setListing] = useState<Listing | null>(null);
  const [form, setForm] = useState<Partial<Listing>>({});
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/listings", { method: "GET" });
        const data = await res.json();
        if (res.ok && data.listings) {
          const found = data.listings.find((l: Listing) => l._id === params.listingId);
          if (!found) {
            setError("Listing not found or you do not have permission to edit this listing.");
            setListing(null);
          } else {
            setListing(found);
            setForm({ ...found });
            setPhotoPreviews(found.photoUrls || []);
          }
        } else {
          setError("Failed to fetch listing.");
        }
      } catch {
        setError("Failed to fetch listing.");
      }
      setLoading(false);
    };
    fetchListing();
  }, [params.listingId]);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "year" || name === "mileage" || name === "suggestedPrice" ? Number(value) : value,
    }));
  };

  // Handle keyFeatures as comma separated
  const handleKeyFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      keyFeatures: e.target.value.split(",").map((k) => k.trim()).filter(Boolean),
    }));
  };

  // Handle photo selection
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles(files);
    setPhotoPreviews([
      ...(form.photoUrls || []),
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Remove a photo preview (for new uploads)
  const handleRemoveNewPhoto = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index - (form.photoUrls?.length || 0)));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an existing photo (already uploaded)
  const handleRemoveExistingPhoto = (index: number) => {
    setForm((prev) => ({
      ...prev,
      photoUrls: (prev.photoUrls || []).filter((_, i) => i !== index),
    }));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (file: File) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload image");
    const data = await res.json();
    return data.secure_url as string;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      // Upload new images if any
      let newPhotoUrls: string[] = [];
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const url = await uploadToCloudinary(file);
          newPhotoUrls.push(url);
        }
      }
      // Combine existing and new photo URLs
      const allPhotoUrls = [
        ...(form.photoUrls || []),
        ...newPhotoUrls,
      ];

      // Prepare update object
      const update: Partial<Listing> = {
        ...form,
        photoUrls: allPhotoUrls,
      };

      // Remove _id if present
      delete (update as any)._id;

      // Send PATCH request
      const res = await fetch("/api/listings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: params.listingId,
          update,
        }),
      });

      if (res.ok) {
        router.push("/sell/my-listings");
      } else {
        const result = await res.json();
        setError(result.error || "Failed to update listing.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to update listing.");
    }
    setUpdating(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Loading listing...</span>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-primary">Edit Listing</CardTitle>
        <CardDescription>Edit your vehicle details below and update your listing.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <Separator />
          {/* Photos */}
          <div className="space-y-2">
            <Label>Photos</Label>
            <div className="flex flex-wrap gap-4 mt-2">
              {/* Existing photos */}
              {(form.photoUrls || []).map((url, idx) => (
                <div key={url} className="relative group">
                  <Image src={url} alt={`Photo ${idx + 1}`} width={100} height={100} className="rounded object-cover aspect-square" />
                  <button
                    type="button"
                    onClick={() => handleRemoveExistingPhoto(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
              {/* New photo previews */}
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="relative group">
                  <Image src={URL.createObjectURL(file)} alt={`New Photo ${idx + 1}`} width={100} height={100} className="rounded object-cover aspect-square" />
                  <button
                    type="button"
                    onClick={() => handleRemoveNewPhoto((form.photoUrls?.length || 0) + idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-80 hover:opacity-100"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <Input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="mt-2"
              onChange={handlePhotoChange}
            />
          </div>
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={form.title || ""} onChange={handleChange} />
          </div>
          {/* Make */}
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Input id="make" name="make" value={form.make || ""} onChange={handleChange} required />
          </div>
          {/* Model */}
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" name="model" value={form.model || ""} onChange={handleChange} required />
          </div>
          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" type="number" value={form.year || ""} onChange={handleChange} required />
          </div>
          {/* Mileage */}
          <div className="space-y-2">
            <Label htmlFor="mileage">Mileage (km)</Label>
            <Input id="mileage" name="mileage" type="number" value={form.mileage || ""} onChange={handleChange} required />
          </div>
          {/* VIN */}
          <div className="space-y-2">
            <Label htmlFor="vin">VIN</Label>
            <Input id="vin" name="vin" value={form.vin || ""} onChange={handleChange} />
          </div>
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={form.description || ""} onChange={handleChange} />
          </div>
          {/* Condition Description */}
          <div className="space-y-2">
            <Label htmlFor="conditionDescription">Condition Notes</Label>
            <Textarea id="conditionDescription" name="conditionDescription" value={form.conditionDescription || ""} onChange={handleChange} />
          </div>
          {/* Pincode */}
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" name="pincode" value={form.pincode || ""} onChange={handleChange} required />
          </div>
          {/* Key Features */}
          <div className="space-y-2">
            <Label htmlFor="keyFeatures">Key Features (comma separated)</Label>
            <Input
              id="keyFeatures"
              name="keyFeatures"
              value={form.keyFeatures?.join(", ") || ""}
              onChange={handleKeyFeaturesChange}
            />
          </div>
          {/* Suggested Price */}
          <div className="space-y-2">
            <Label htmlFor="suggestedPrice">Suggested Price</Label>
            <Input id="suggestedPrice" name="suggestedPrice" type="number" value={form.suggestedPrice || ""} onChange={handleChange} />
          </div>
          {/* Market Analysis */}
          <div className="space-y-2">
            <Label htmlFor="marketAnalysis">Market Analysis</Label>
            <Textarea id="marketAnalysis" name="marketAnalysis" value={form.marketAnalysis || ""} onChange={handleChange} />
          </div>
          <Separator />
          {/* Update Button */}
          <Button type="submit" disabled={updating} className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
            {updating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
            {updating ? "Updating..." : "Update Listing"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}