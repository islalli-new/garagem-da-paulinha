import { appleStartupImages } from "@/lib/apple-startup-images"

export default function Head() {
  return (
    <>
      {appleStartupImages.map((image) => (
        <link
          key={image.href}
          rel="apple-touch-startup-image"
          href={image.href}
          media={image.media}
        />
      ))}
    </>
  )
}
