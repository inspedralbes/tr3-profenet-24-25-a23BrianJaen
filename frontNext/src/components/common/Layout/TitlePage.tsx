
interface TitlePageProps {
  text: string
}

export default function TitlePage({ text }: TitlePageProps) {
  return (
    <div className="inline-block w-fit border border-gray-300 p-2 rounded-lg mb-6">
      <span className="text-4xl font-bold">{text}</span>
    </div>
  )
}