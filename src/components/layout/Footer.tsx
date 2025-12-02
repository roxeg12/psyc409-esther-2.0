const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} University Student Portal. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

