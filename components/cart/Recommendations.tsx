import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Recommendations() {
  return (
    <div className="mt-16">
      <Card>
        <CardHeader>
          <CardTitle>Vous pourriez aussi aimer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Découvrez d&apos;autres smartphones compatibles avec votre choix
            </p>
            <Button variant="outline" asChild>
              <Link href="/">Voir le catalogue</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
