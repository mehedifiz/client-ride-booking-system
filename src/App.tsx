import { Button } from "@/components/ui/button"
import { useGetTestQuery } from "./redux/features/test";

function App() {
    const { data, error, isLoading } = useGetTestQuery(undefined);  // 👈 call here
  console.log(data)
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App