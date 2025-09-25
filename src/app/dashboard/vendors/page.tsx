'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const vendors = [
  {
    name: 'GreenScape Decorations',
    category: 'Decor',
    rating: 4.8,
    status: 'active',
  },
  {
    name: 'Eco-Catering Services',
    category: 'Catering',
    rating: 4.5,
    status: 'active',
  },
  {
    name: 'Sustainable Sounds',
    category: 'Entertainment',
    rating: 4.2,
    status: 'inactive',
  },
  {
    name: 'Recycle-a-cup',
    category: 'Waste Management',
    rating: 4.9,
    status: 'active',
  },
];

export default function VendorsPage() {
  return (
    (<div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold font-headline text-primary mb-8">
        Vendors
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.name}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.category}</TableCell>
              <TableCell>{vendor.rating}</TableCell>
              <TableCell>
                <Badge
                  variant={vendor.status === 'active' ? 'default' : 'destructive'}
                >
                  {vendor.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>)
  );
}
