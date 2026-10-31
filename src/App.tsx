import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import { About, Article, Benefits, CalculatorPage, Careers, ProductDetail, Products, Employers, Faqs, Governance, News, NotFound, Privacy, Schemes, Terms, Transfers } from './pages/Info'
import { Complaints, Contact } from './pages/MailForms'
import Join from './pages/Join'
import { EmployerDashboard, EmployerLogin, EmployerRegister, EmployerReset, MemberActivate, MemberDashboard, MemberLogin, MemberReset } from './pages/Portal'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="calculator" element={<CalculatorPage />} />
        <Route path="about" element={<About />} />
        <Route path="schemes" element={<Schemes />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="employers" element={<Employers />} />
        <Route path="transfers" element={<Transfers />} />
        <Route path="benefits" element={<Benefits />} />
        <Route path="news" element={<News />} />
        <Route path="news/:slug" element={<Article />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="governance" element={<Governance />} />
        <Route path="careers" element={<Careers />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="join" element={<Join />} />
        <Route path="employer/register" element={<EmployerRegister />} />
        <Route path="member/login" element={<MemberLogin />} />
        <Route path="member/activate" element={<MemberActivate />} />
        <Route path="member/reset" element={<MemberReset />} />
        <Route path="member" element={<MemberDashboard />} />
        <Route path="employer/login" element={<EmployerLogin />} />
        <Route path="employer/reset" element={<EmployerReset />} />
        <Route path="employer" element={<EmployerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
