import {Navigate, Route, Routes} from 'react-router-dom'
import {Layout} from '@/components/Layout'
import {HomePage} from '@/pages/HomePage'
import {MembersPage} from '@/pages/MembersPage'
import {PerformanceLabPage} from '@/pages/PerformanceLabPage'
import {PlayersLeaguePage} from '@/pages/PlayersLeaguePage'
import {ShopPage} from '@/pages/ShopPage'
import {RegisterDivisionPage} from '@/pages/RegisterDivisionPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/performance-lab" element={<PerformanceLabPage />} />
        <Route path="/players-league" element={<PlayersLeaguePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/register/:division" element={<RegisterDivisionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
