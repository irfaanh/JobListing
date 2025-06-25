import { Loader2 } from "lucide-react";

export default function Loader() {

  return  <div className="flex justify-center items-center w-full h-[calc(100vh-97px)]">
      <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
    </div>
}
