import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { currentUser } from '@clerk/nextjs/server'
import { useTranslations } from 'next-intl'

const DashboardButton = async () => {
  const t = useTranslations("General.header");

  const user = await currentUser();

  return !!user?.publicMetadata?.isAdmin ? (
    <Link href="/dashboard">
      <Button>{t("dashboard")}</Button>
    </Link>
  ) : null
}

export default DashboardButton