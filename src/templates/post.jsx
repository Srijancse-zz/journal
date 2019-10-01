import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/core'
import { TwitterIcon, LinkedinIcon } from 'react-share'
import { Layout, Wrapper, SliceZone, Title, SEO } from '../components'
import { BlogCard, Featured } from '../components/Listing'
import prism from '../styles/prism'
import website from '../../config/website'
import drawer from '../assets/drawer.svg'
import Sidebar from '../components/Sidebar'
import { theme } from '../styles'
import BlogTag from '../components/Tag'
import { ExternLink, SectionTitle } from '../components/Wrappers'
import SocialShare from '../components/SocialShare'
import SectionNav from '../components/SectionNav'
import fallbackImage from '../assets/bg_fallback.svg'

const { breakpoints } = theme

const PostWrapper = styled(Wrapper.withComponent('main'))`
  .blog-image {
    height: 38rem;
    object-fit: contain;

    @media (max-width: ${breakpoints.m}) {
      height: 30rem;
    }
    @media (max-width: ${breakpoints.s}) {
      height: 20rem;
    }
  }

  .blog-meta {
    font-size: 1.4rem;
    line-height: 2rem;
    color: #808080;
  }

  .author-info-inline {
    display: none;
  }

  @media (max-width: ${breakpoints.m}) {
    .author-info-side {
      display: none;
    }
    .author-info-inline {
      display: block;
      padding: 0 4vw;
    }
  }
`

const BlogInfoWrapper = styled.div`
  .content-footer {
    padding: 0 4vw;
  }
  .author-image {
    border-radius: 50%;
    height: 2.8rem;
    width: 2.8rem;
    margin-bottom: 1rem;
  }
  @media (max-width: ${breakpoints.s}) {
    width: 100%;
    margin-top: 6rem;
  }
`

const BlogHeader = styled.div`
  height: 38rem;
  widht: 100%;
  @media (max-width: ${breakpoints.m}) {
    height: 30rem;
  }
  @media (max-width: ${breakpoints.s}) {
    height: 20rem;
  }
`

const StyledTitle = styled.h1`
  margin-bottom: 0;
  padding: 0 4vw;
  font-size: 3.2rem;

  @media (max-width: ${breakpoints.m}) {
    font-size: 3.2rem;
  }

  @media (max-width: ${breakpoints.s}) {
    font-size: 2.8rem;
  }
`

const BlogContent = styled.div`
  ${prism}
  font-size: 2.1rem;
  line-height: 3.3rem;
  font-family: minion-pro, serif;
  font-weight: 400;
  font-style: normal;
  padding: 0 4vw;

  @media (max-width: ${breakpoints.s}) {
    font-size: 1.8rem;
    line-height: 3.1rem;
  }

  img {
    width: 100%;
  }
  figure {
    margin-bottom: 2rem;
  }
  ol,
  ul {
    margin-left: 0;
  }
  figcaption {
    margin-top: 1rem;
    font-size: 1.4rem;
    line-height: 1.7rem;
    color: #666666;
  }
  div[data-oembed] {
    width: 100%;
    height: 60vh;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  pre {
    background: #fff;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    color: #333333;
    padding: 2rem;
    font-family: Source Code Pro;
    line-height: 2rem;
    overflow: scroll;
  }
  blockquote {
    margin-left: 0;
    padding: 2rem 2.2rem;
    border-left: 0.2rem solid #036600;
    font-size: 2rem;
    line-height: 2.8rem;
    color: #666666;
  }
`

const ImageWrapper = styled.span`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${props => props.bannercolor};
`

const categoryColors = {
  engineering: {
    bg: '#FCD06E',
    text: '#1a1a1a',
  },
  'business--growth': {
    bg: '#025C52',
    text: '#f7f7f7',
  },
  'product--design': {
    bg: '#813A4C',
    text: '#ffffff',
  },
}

const DrawerIcon = styled.span`
  position: fixed;
  top: 2.8rem;
  left: 2.4rem;
  cursor: pointer;
  padding: 1.1rem 0.8rem;
  z-index: 2;
  @media (max-width: ${breakpoints.s}) {
    left: 1rem;
    top: 1.5rem;
    background: #fff;
  }
`

const TagWrapper = styled.div`
  display: flex;
  &:empty {
    display: none;
  }
`

const AuthorBio = styled.div`
  display: flex;
  align-items: center;

  h1,
  h2,
  h3 {
    margin-bottom: 1rem;
  }
  .author-img {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .blog-meta {
    padding-left: 1.4rem;
  }
  .svg-container {
    position: relative;
    width: 4.2rem;
    height: 4.2rem;
  }
  img {
    border-radius: 50%;
    padding: 4px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .button-outline {
    stroke-dasharray: 140px;
    stroke-dashoffset: 140px;
    fill: transparent;
    transition: all 0.8s ease-out 0s;
    stroke-width: 1px;
  }
  .svg-container:hover .button-outline {
    stroke-dasharray: 140px;
    stroke-dashoffset: 0px;
    fill: transparent;
  }
`

const RelatedWrapper = styled.div``

const filterRelatedPosts = (allPosts, categorySlug, blogSlug) => {
  return allPosts
    .filter(
      post =>
        post.data.category.document[0].slugs[0] === categorySlug &&
        post.slugs[0] !== blogSlug
    )
    .slice(0, 2)
}

const Post = ({
  data: { prismicPost, allPosts },
  location: {
    state: { sidebar },
  },
  path,
}) => {
  const [showSidebar, setShowSidebar] = useState(sidebar || false)
  const [headers, setHeaders] = useState([])

  useEffect(() => {
    const content = document.querySelector('.blog-content')
    const headings = content.querySelectorAll('h1')
    setHeaders(headings)
  }, [])

  const blogTags = prismicPost.tags
  const blogSlug = prismicPost.slugs[0]
  const {
    author,
    blog_image,
    preview_image,
    body,
    published_on,
    title,
    category,
    description,
    bannercolor,
  } = prismicPost.data
  const {
    author_image,
    author_name,
    author_position,
    bio,
    linkedin,
    twitter,
  } = author.document[0].data
  const categorySlug = category.document[0].slugs[0]
  const categoryTitle = category.document[0].data.title.text
  const relatedPosts = filterRelatedPosts(
    allPosts.nodes,
    categorySlug,
    blogSlug
  )
  return (
    <Sidebar
      allPosts={allPosts}
      open={showSidebar}
      setShowSidebar={setShowSidebar}
      onSetOpen={open => setShowSidebar(open)}>
      <Layout customSEO path={path}>
        <Global
          styles={css`
            html,
            body {
              background: white;
            }
          `}
        />
        <SEO
          title={`${title.text} | ${website.titleAlt}`}
          pathname={location.pathname}
          desc={description}
          banner={preview_image.url || blog_image.url}
          node={prismicPost}
          article
        />
        <DrawerIcon onClick={() => setShowSidebar(!showSidebar)}>
          <img src={drawer} alt="drawer icon" />
        </DrawerIcon>
        <SectionNav path={path} headings={[...headers]} />
        <div className="o-container u-margin-bottom-xlarge">
          <PostWrapper className="posts o-layout">
            <BlogHeader className="o-layout_item u-6/6@from-medium">
              <ImageWrapper
                categorySlug={categorySlug}
                hideTag={
                  typeof window !== 'undefined' && window.innerWidth < 600
                }
                bannercolor={bannercolor}>
                <img
                  className="blog-image"
                  src={blog_image.url || fallbackImage}
                  alt={blog_image.alt}
                />
              </ImageWrapper>
            </BlogHeader>
            <div className="o-layout">
              <div className="author-info-side o-layout_item u-1/6@from-medium u-margin-vertical-large">
                <div className="blog-meta">{author_name.text}</div>
                <div className="blog-meta">{published_on}</div>
              </div>
              <StyledTitle className="o-layout_item u-4/6@from-medium u-margin-vertical-large">
                {title.text}
              </StyledTitle>
              <div className="author-info-inline o-layout_item u-1/6@from-medium u-margin-vertical-xsmall">
                <div className="blog-meta">{author_name.text}</div>
                <div className="blog-meta">{published_on}</div>
              </div>
            </div>

            <BlogInfoWrapper className="o-layout u-margin-bottom-large">
              <SocialShare
                className="o-layout_item u-1/6@from-medium u-margin-bottom-large"
                title={title.text}
                url={location.href}
                authorTwitter={twitter}
              />
              <BlogContent
                className="blog-content o-layout_item u-4/6@from-medium u-margin-bottom-large"
                dangerouslySetInnerHTML={{ __html: body.html }}
              />
              <div className="o-layout -flex -center">
                <div className="o-layout_item -middle u-4/6@from-medium  content-footer">
                  <TagWrapper>
                    {blogTags.map(tag => (
                      <BlogTag text={tag} />
                    ))}
                  </TagWrapper>
                  <hr className="u-margin-vertical-small" />
                  <AuthorBio>
                    <span className="author-img">
                      <ExternLink
                        target="_blank"
                        href={linkedin && linkedin.url}
                        className="svg-container">
                        <svg
                          width="42"
                          height="42"
                          viewBox="0 0 42 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <circle
                            cx="21"
                            cy="21"
                            r="20"
                            stroke={
                              linkedin && linkedin.url ? '#007fb1' : '#00aced'
                            }
                            stroke-width="2"
                            className="button-outline"
                          />
                        </svg>
                        <img src={author_image.url} alt={author_name.text} />
                      </ExternLink>
                    </span>
                    <span className="blog-meta">
                      {bio.text ||
                        `${author_name.text}, ${author_position.text}`}
                    </span>
                  </AuthorBio>
                </div>
              </div>
            </BlogInfoWrapper>
          </PostWrapper>
          {relatedPosts.length > 0 && (
            <RelatedWrapper className="o-layout_item u-6/6@from-medium u-margin-top-large">
              <SectionTitle className="u-margin-bottom-small">
                Related in {categoryTitle}
              </SectionTitle>
              <div className="posts o-layout -gutter">
                {relatedPosts.map(post => (
                  <BlogCard
                    post={post}
                    className="o-layout_item u-3/6@from-medium u-margin-bottom-small"
                  />
                ))}
              </div>
            </RelatedWrapper>
          )}
        </div>
      </Layout>
    </Sidebar>
  )
}

export default Post

Post.propTypes = {
  data: PropTypes.shape({
    prismicPost: PropTypes.object.isRequired,
    posts: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

// The typenames come from the slice names
// If this doesn't work for you query for __typename in body {} and GraphiQL will show them to you

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    prismicPost: prismicBlogPost(slugs: { eq: $slug }) {
      tags
      last_publication_date
      slugs
      data {
        published_on(formatString: "MMM D, YYYY")
        description
        title {
          text
        }
        body {
          html
        }
        blog_image {
          alt
          url
        }
        preview_image {
          alt
          url
        }
        category {
          document {
            slugs
            data {
              title {
                text
              }
            }
          }
        }
        bannercolor
        author {
          document {
            data {
              author_image {
                alt
                url
              }
              author_name {
                text
              }
              author_position {
                text
              }
              bio {
                text
              }
              linkedin {
                url
              }
              twitter {
                url
              }
            }
          }
        }
      }
    }
    allPosts: allPrismicBlogPost(
      sort: { order: DESC, fields: data___published_on }
    ) {
      nodes {
        slugs
        data {
          published_on
          body {
            text
          }
          author {
            document {
              data {
                author_name {
                  text
                }
              }
            }
          }
          category {
            document {
              slugs
              data {
                title {
                  text
                }
              }
            }
          }
          blog_image {
            alt
            url
          }
          title {
            text
          }
        }
      }
    }
  }
`
