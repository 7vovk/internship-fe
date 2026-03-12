import { Button } from "@/app/Components/button";

const PROJECT_NAME = "Internship FE";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <main className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
          {PROJECT_NAME}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Welcome!
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button size="lg">Get started</Button>
          <Button variant="outline" size="lg">
            Learn more
          </Button>
        </div>
      </main>
    </div>
  );
}
