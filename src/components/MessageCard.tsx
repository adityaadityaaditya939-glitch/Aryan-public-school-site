import Image from "next/image";

interface MessageCardProps {
  title: string;
  name: string;
  image: string;
  preview: string;
}

export default function MessageCard({ title, name, image, preview }: MessageCardProps) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-lg">
      <h3 className="px-6 pt-6 text-sm font-bold uppercase tracking-wider text-aps-navy">
        {title}
      </h3>
      <div className="mt-4 grid md:grid-cols-5">
        <div className="flex items-center justify-center bg-aps-navy p-8 md:col-span-2">
          <span className="rounded border-2 border-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
            Read Message →
          </span>
        </div>
        <div className="relative h-80 md:col-span-3 md:h-auto md:min-h-[280px]">
          <Image src={image} alt={name} fill className="object-cover object-center" />
        </div>
      </div>
      <div className="border-t px-6 py-4">
        <p className="font-semibold text-aps-navy">{name}</p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{preview}</p>
      </div>
    </article>
  );
}
