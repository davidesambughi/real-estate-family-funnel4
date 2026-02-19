import type { Metadata } from "next";

/**
 * Blog — Placeholder Page
 *
 * This route exists to prevent Next.js 404 errors for the /blog path.
 * It will be replaced with real content in Sprint 3/4.
 *
 * Planned content: Family relocation tips, school comparison articles,
 * neighborhood guides, and expat lifestyle posts.
 */
export const metadata: Metadata = {
    title: "Blog — Coming Soon | TrustFamily Relocation",
    description: "Expert articles on family relocation to Portugal, international school comparisons, and neighborhood guides. Coming soon.",
    robots: { index: false, follow: false }, // noindex until content is live
};

export default function BlogPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
            <p className="text-5xl mb-4">✍️</p>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">Blog — Coming Soon</h1>
            <p className="text-lg text-slate-500 max-w-md">
                We are preparing expert articles on schools, neighborhoods, and family relocation to Portugal.
                Check back soon.
            </p>
        </main>
    );
}
