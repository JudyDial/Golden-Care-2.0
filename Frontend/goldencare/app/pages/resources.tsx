import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourcesPage() {
    return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <CardTitle>Educational Resources</CardTitle>
                <CardDescription>Learn more about managing your health</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                <ResourceItem title="Understanding Hypertension" type="Article" />
                <ResourceItem title="Diabetes Management Tips" type="Video" />
                <ResourceItem title="Importance of Regular Exercise" type="Guide" />
                </ul>
            </CardContent>
        </Card>
    </div>
    );
}
interface ResourceItemProps {
    title: string;
    type: string;
  }
  


  function ResourceItem({ title, type }:ResourceItemProps ) {
    return (
      <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
        <h4 className="font-semibold">{title}</h4>
        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">{type}</span>
      </li>
    )
  }