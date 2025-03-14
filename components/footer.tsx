import Link from "next/link"
import { Brain } from "lucide-react"

export function Footer() {
  return (
    <footer >
     
       
        
        <div className="mt-8 pt-8 border-t border-premium-indigo-800/20 text-center text-sm text-premium-indigo-300">
          © {new Date().getFullYear()} Jai Ho. All rights reserved.
        </div>
    
    </footer>
  )
}
