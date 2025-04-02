import { Link } from "react-router-dom"
import { CarFront } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <div className="flex items-center gap-2">
          <CarFront className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">DrivEase</span>
        </div>
        <p className="text-sm text-muted-foreground">© 2023 DrivEase. All rights reserved.</p>
        <nav className="flex items-center gap-4">
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

