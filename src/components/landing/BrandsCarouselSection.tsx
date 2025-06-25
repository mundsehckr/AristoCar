
import Image from 'next/image';

const brands = [
  { name: "Maruti Suzuki", logoUrl: "https://placehold.co/150x60.png", hint: "maruti suzuki logo" },
  { name: "Hyundai", logoUrl: "https://placehold.co/150x60.png", hint: "hyundai logo" },
  { name: "Tata Motors", logoUrl: "https://placehold.co/150x60.png", hint: "tata motors logo" },
  { name: "Mahindra", logoUrl: "https://placehold.co/150x60.png", hint: "mahindra logo" },
  { name: "Honda", logoUrl: "https://placehold.co/150x60.png", hint: "honda logo" },
  { name: "Toyota", logoUrl: "https://placehold.co/150x60.png", hint: "toyota logo" },
  { name: "Kia", logoUrl: "https://placehold.co/150x60.png", hint: "kia logo" },
];

export function BrandsCarouselSection() {
  return (
    <section className="py-12 sm:py-16 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* For a real carousel, you'd use a library like Swiper.js or Embla Carousel */}
        {/* This is a static representation */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-6">
          {brands.map((brand, index) => (
            <div key={brand.name} className="opacity-70 hover:opacity-100 transition-opacity duration-300 animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
              <Image
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                width={150} 
                height={60}  
                className="object-contain"
                data-ai-hint={brand.hint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
