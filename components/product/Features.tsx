"use client";

import { Card, CardContent } from "@/components/ui/card";
import { getFreeShippingThresholdDZD } from "@/config/shop";
import { useCurrency } from "@/context/CurrencyContext";
import { RotateCcw, Shield, Truck } from "lucide-react";

export default function Features() {
  const { formatPrice } = useCurrency();
  const threshold = getFreeShippingThresholdDZD();

  const features = [
    {
      icon: Truck,
      title: "Livraison gratuite",
      desc: `À partir de ${formatPrice(threshold)} d'achat`,
    },
    { icon: Shield, title: "Garantie", desc: "2 ans constructeur" },
    {
      icon: RotateCcw,
      title: "Retours faciles",
      desc: "14 jours pour changer d'avis",
    },
  ];

  return (
    <Card className="mb-16">
      <CardContent className="p-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground mb-1">
                  {feature.title}
                </h2>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
