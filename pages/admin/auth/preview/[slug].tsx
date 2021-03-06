import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'
import Head from 'next/head'

// Helpers
import { URL } from '../../../../helpers/url' 

// Components 
import BlogPreview from '../../../../components/blogPreview/blogPreview'

// Typescripts
import { Iblog } from '../../../../ts/blogs'

// Styles
import styles from '../../../blog/Blog.module.scss'

export const getStaticPaths: GetStaticPaths = () => {

    return {
        paths: [
            { params: { slug: '1' } }
        ],
        fallback: 'blocking'
    }

}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const param = params as {slug: string}
    const {data: blog} = await axios.get(`${URL}/blogs?slug=${param.slug}`)

    return {
        props: {
            blogSlug: param.slug,
            blog
        }
    }

}

const Preview: NextPage<{blog: Iblog[]}> = ({blog}) => {

    return (
        <div className={styles.container}>
            <Head>
                <title> {blog[0].title} </title>
            </Head>

            <main>
                <BlogPreview title={blog[0].title} description={blog[0].description} url={blog[0].blogUrl ? blog[0].blogUrl : '/default.jpg'} />
            </main>
        </div>
    )
}

export default Preview