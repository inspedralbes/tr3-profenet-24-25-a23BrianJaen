
interface TitlePageProps {
  text: string
}

export default function TitlePage({ text }: TitlePageProps) {
  return (
    <div className="flex items-center w-fit border border-gray-300 p-2 rounded-lg ">
      <span className="text-4xl font-bold">{text}</span>
    </div>
  )
}