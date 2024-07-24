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

        const contentSections = page.data[0].attributes.contentSections;
        // console.log(`contentSections: ${JSON.stringify(contentSections)}`);

        return contentSections.map((section: any, index: number) =>
            sectionRenderer(section, index)
        );
    } catch (error: any) {
        console.error('Error:', error);
        if (typeof window !== 'undefined') {
            window.alert('Missing or invalid credentials');
        }
    }
}
