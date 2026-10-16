import { Button } from "@/components/ui/button";

export default function HomePage() {
  console.log("Root Route")
  return (
    <div>
      Hello, Next.js!
      <Button size={"lg"} variant={"destructive"}>
        Click Me
      </Button>
    </div>
  );
}
