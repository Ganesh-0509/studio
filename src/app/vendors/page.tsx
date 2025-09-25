import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { vendors } from '@/lib/data';
import { Award, Leaf, Star } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function VendorsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold font-headline">Vendor Directory</h1>
        <div className="flex gap-2 flex-wrap">
          <Input placeholder="Search vendors..." className="max-w-xs" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="catering">Catering</SelectItem>
              <SelectItem value="av">AV</SelectItem>
              <SelectItem value="decorations">Decorations</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Apply</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={vendor.imageUrl}
                alt={vendor.name}
                width={600}
                height={400}
                data-ai-hint={vendor.imageHint}
                className="rounded-t-lg aspect-[3/2] object-cover"
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="mb-2">{vendor.name}</CardTitle>
              <CardDescription>{vendor.description}</CardDescription>
              <div className="mt-4 flex items-center text-sm text-primary">
                <Leaf className="h-4 w-4 mr-2"/> 
                Sustainability Score: {vendor.sustainabilityScore}/100
              </div>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex flex-col items-start gap-4">
               <div className="w-full">
                <h4 className="text-sm font-semibold mb-2">Services</h4>
                <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service) => (
                    <Badge key={service} variant="secondary">
                        {service}
                    </Badge>
                    ))}
                </div>
               </div>
               {vendor.certifications.length > 0 && (
                <div className="w-full">
                    <h4 className="text-sm font-semibold mb-2">Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                        {vendor.certifications.map((cert) => (
                            <Badge key={cert} variant="outline" className="border-accent text-accent">
                                <Award className="mr-1 h-3 w-3" />
                                {cert}
                            </Badge>
                        ))}
                    </div>
                </div>
                )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
