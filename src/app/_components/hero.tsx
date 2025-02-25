import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MapPin } from "lucide-react"

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat h-[600px]"
      style={{ backgroundImage: "url('https://placehold.co/1600x600')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
        <p className="text-xl mb-8">Find and book amazing trips around the world</p>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Find your Next Travel</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex items-center space-x-4">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input type="text" placeholder="Where do you want to go?" className="text-inherit pl-10 w-full" />
              </div>
              <Button type="submit" className="flex-shrink-0">
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

