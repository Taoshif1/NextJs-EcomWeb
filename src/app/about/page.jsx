import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Navbar and Footer are included via the outer layout, but kept here if the user's layout doesn't wrap */}
        <Navbar /> 
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About ShopHub</h1>
            <p className="text-xl text-blue-100">
              Your trusted destination for quality products and exceptional service
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  Welcome to ShopHub, your premier destination for quality products at unbeatable prices. 
                  Founded with a vision to revolutionize online shopping, we've built a platform that 
                  combines convenience, quality, and affordability.
                </p>
                <p>
                  Our journey began with a simple idea: create an e-commerce platform that puts customers 
                  first. Today, we serve thousands of satisfied customers worldwide, offering a curated 
                  selection of products across multiple categories.
                </p>
                <p>
                  We believe in transparency, quality, and exceptional customer service. Every product in 
                  our catalog is carefully selected to meet our high standards, ensuring you get the best 
                  value for your money.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section - Corrected Structure */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Value 1: Quality First */}
              <div className="text-center p-6">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We carefully curate every product to ensure it meets our high standards of quality and excellence.
                </p>
              </div>
              
              {/* Value 2: Customer Focused */}
              <div className="text-center p-6">
                <div className="text-5xl mb-4">💙</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Focused</h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We're here to make your shopping experience exceptional.
                </p>
              </div>

              {/* Value 3: Sustainability - This block was missing the wrapping div in your original code */}
              <div className="text-center p-6"> 
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to environmentally responsible practices and sustainable business operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                <p className="text-gray-600">Products</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-gray-600">Countries</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
                <p className="text-gray-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}