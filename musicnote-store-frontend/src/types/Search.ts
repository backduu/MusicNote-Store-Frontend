type SearchType = 'all' | 'song' | 'artist' | 'album' | 'playlist'

interface SearchResult {
    id: string
    type: 'music' | 'score'
    title: string
    artist: string
    thumbnailUrl: string
    price: number
    rating?: number
    reviewCount?: number
    genre?: string
    instrument?: string
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    previewAvailable: boolean
}