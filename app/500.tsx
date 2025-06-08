import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServerError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">500</h1>
        <h2 className="mt-4 text-3xl font-semibold text-gray-700">Server Error</h2>
        <p className="mt-2 text-lg text-gray-600">Sorry, something went wrong on our server.</p>
        <div className="mt-8">
          <Link href="/" passHref>
            <Button variant="default" size="lg">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
