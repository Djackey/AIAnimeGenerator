import LangRedirect from './components/LangRedirect';
import { sectionRenderer } from './utils/section-renderer';
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";

export default async function RootRoute({ params }: { params: { lang: string } }) {
    try {
        // console.log(`RootRoute - params: ${JSON.stringify(params)}`);

        const page = await getPageBySlug('/', params.lang);
        // console.log(`getPageBySlug - page: ${JSON.stringify(page)}`);

        if (page.error && page.error.status == 401) {
            // console.error('Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/');
            throw new Error(
                'Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/'
            );
        }

        if (page.data.length == 0 && params.lang !== 'en') {
            // console.log('No data found, redirecting...');
            return <LangRedirect />;
        }

        if (page.data.length === 0) {
            // console.log('No data found, returning null...');
            return null;
        }

        const pageAttributes = page.data[0].attributes;  // 获取页面的顶级属性
        const contentSections = pageAttributes.contentSections;
        const updatedAt = pageAttributes.updatedAt;  // 从页面属性获取更新日期
        
        // 使用更新日期调用 sectionRenderer
        return contentSections.map((section: any, index: number) =>
            sectionRenderer(section, index, updatedAt)  // 传递 updatedAt 至 renderer
        );
    } catch (error: any) {
        console.error('Error:', error);
        if (typeof window !== 'undefined') {
            window.alert('Missing or invalid credentials');
        }
    }
}
