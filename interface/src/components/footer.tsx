export default function Footer() {
  function date() {
    return new Date().getFullYear()
  }
  return (
    <footer className="h-[182px]">
      <section className="bg-black h-full">
        <div className="flex justify-evenly text-white px-3">
          <div className="space-y-3 mt-8">
            <h1 className="text-2xl">System for managing rooms</h1>
            <p>
              System for managing rooms, specifically designed for a particular
              institution.
            </p>
          </div>
        </div>
        <div className="border-t-2 rounded-sm border-white w-1/2 mx-auto my-4 mt-8"></div>
        <div className="text-white text-center text-xs">
          &copy;Copyright {date()}.
        </div>
      </section>
    </footer>
  )
}
