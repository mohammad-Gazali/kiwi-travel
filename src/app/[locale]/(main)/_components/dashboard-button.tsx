import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { auth } from '@clerk/nextjs/server'
import { useTranslations } from 'next-intl'

const DashboardButton = async () => {
  const t = useTranslations("General.header");

  const { sessionClaims } = await auth();

  return !!sessionClaims?.metadata.isAdmin ? (
    <Link href="/dashboard">
      <Button>{t("dashboard")}</Button>
    </Link>
  ) : null
}

export default DashboardButton