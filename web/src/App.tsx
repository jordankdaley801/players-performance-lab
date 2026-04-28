import {Navigate, Route, Routes} from 'react-router-dom'
import {Layout} from '@/components/Layout'
import {HomePage} from '@/pages/HomePage'
import {PerformanceLabPage} from '@/pages/PerformanceLabPage'
import {MembersPage} from '@/pages/MembersPage'
import {FieldhousePage} from '@/pages/FieldhousePage'
import {ShopPage} from '@/pages/ShopPage'
import {CartPage} from '@/pages/CartPage'
import {RegisterDivisionPage} from '@/pages/RegisterDivisionPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/performance-lab" element={<PerformanceLabPage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/fieldhouse" element={<FieldhousePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register/:division" element={<RegisterDivisionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
