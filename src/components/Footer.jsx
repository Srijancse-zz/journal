import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { StyledLink, ExternLink } from './Wrappers'
import { theme } from '../styles'
import { getCategoryFirstPost } from '../utils'
import clarisightsLogo from '../assets/white-logo.svg'

const { breakpoints, colors } = theme

const categoryColors = {
  Engineering: {
    bg: '#FCD06E',
  },
  'Business & Growth': {
    bg: '#025C52',
  },
  'Product & Design': {
    bg: '#813A4C',
  },
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #fff;
  width: 100vw;
  background-color: black;
  .social-links,
  .categories-links {
    justify-content: space-between;
    a {
      margin-bottom: 0.7rem;
    }
  }
  @media (max-width: ${breakpoints.s}) {
    flex-direction: column;
    align-items: start;
    padding: 5.6rem 2.8rem 5.6rem 2.8rem;
  }
`

const isSingle = props => props.left && props.path === '/'

const Section = styled.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${breakpoints.s}) {
    margin-left: 0;
    flex-direction: column;
    &:not(:last-child) {
      padding-bottom: 5rem;
    }
  }
`

const SpacedFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin: 7rem 0 10rem 0;

  @media (max-width: ${breakpoints.s}) {
    margin: 4.2rem 0;
  }
`

const Title = styled.div`
  margin-bottom: 0.7rem;
  color: ${colors.neutral45};
`

const Logo = styled.img`
  margin-bottom: 0.7rem;
`

const Slash = styled.span`
  display: inline-block;
  padding-right: 0.4rem;
`

const Footer = ({ categories, path, allPosts }) => (
  <StyledFooter path={path} className="footer">
    <Section left path={path} className="o-container">
      <Column>
        <StyledLink to="/">
          <Logo src={clarisightsLogo} alt="Journal Home" />
        </StyledLink>
        <ExternLink
          href="https://clarisights.com/careers"
          alt="Careers page"
          target="_blank">
          Job listings
        </ExternLink>
      </Column>
      <Column className="categories-links">
        <StyledLink to="/">
          <Title style={{ marginBottom: 0 }}>Journal</Title>
        </StyledLink>
        {categories.map(cat => (
          <div className="o-layout -flex" key={cat.uid}>
            <Slash>/</Slash>
            <StyledLink to={`/${getCategoryFirstPost(allPosts, cat.uid)}`}>
              <span key={cat.data.title.text}>{cat.data.title.text} </span>
            </StyledLink>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 15V4L16 15H5Z"
                fill={categoryColors[cat.data.title.text].bg}
              />
            </svg>
          </div>
        ))}
      </Column>
      <Column className="social-links">
        <ExternLink target="_blank" href="https://github.com/clarisights">
          GitHub
        </ExternLink>
        <ExternLink target="_blank" href="https://twitter.com/clarisights">
          Twitter
        </ExternLink>
        <ExternLink
          target="_blank"
          href="https://www.linkedin.com/company/clarisights/">
          LinkedIn
        </ExternLink>
        <ExternLink target="_blank" href="https://www.dribbble.com/clarisights">
          Dribbble
        </ExternLink>
      </Column>
      <Column>
        <Title>© Clarisights 2019</Title>
        <ExternLink
          target="_blank"
          href="https://clarisights.com/privacy-policy">
          Privacy Policy
        </ExternLink>
      </Column>
    </Section>
  </StyledFooter>
)

export default Footer
