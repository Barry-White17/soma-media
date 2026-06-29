import PlayMedia from './media/PlayMedia.js'
import { read } from './media/api-media.js'

const routes = [
    {
        path: '/media/:mediaId',
        component: PlayMedia,
        loadData: (params) => read(params),
    },
]
export default routes
