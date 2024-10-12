import Link from "next/link";
import prisma from "@/lib/db";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`} className="block">
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              {course.imageUrl && (
                <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
