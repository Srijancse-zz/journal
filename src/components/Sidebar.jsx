import React, { useState } from 'react'
import Sidebar from 'react-sidebar'
import styled from '@emotion/styled'
import { Input, Icon } from 'knit-ui'
import { Link } from 'gatsby'
import clarisightsLogo from '../assets/logo.svg'
import BlogCard from './Listing/BlogCard'

const SidebarWrapper = styled.div`
  width: 50vw;
  max-width: 80rem;
  padding: 4rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
`

const VertFlex = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => (props.categories ? 3 : 4.6)};
  font-size: 1.4rem;
  line-height: 2rem;
  height: 100%;
  span:not(:last-child) {
    margin-bottom: 1.4rem;
  }
  .search-wrapper {
    width: 100%;
    input {
      background: transparent;
      border: 1px solid #1a1a1a;
    }
  }
  .logo {
    width: fit-content;
    margin-top: auto;
  }
`

const CategoryItem = styled.span`
  width: fit-content;
`

const SidebarContent = () => {
  const [search, setSearch] = useState('')
  const categories = ['All', 'Engineering', 'Business & Growth', 'Product & Design', 'Archives'] // mock, swap this from gql data

  return (
    <SidebarWrapper>
      <VertFlex categories>
        {categories.map(cat => (
          <CategoryItem>{cat}</CategoryItem>
        ))}
        <Link to='/' className="logo">
          <img src={clarisightsLogo} alt="Clarisights logo" />
        </Link>
      </VertFlex>
      <VertFlex>
        <span className="search-wrapper">
          <Input
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for a post"
            addonBefore={<Icon type="oSearch" />}
          />
        </span>
      </VertFlex>
    </SidebarWrapper>
  )
}

const Drawer = props => (
  <Sidebar sidebar={<SidebarContent />} open={props.open} styles={{ sidebar: { background: '#f4f2ee', zIndex: 3 } }}>
    {props.children}
  </Sidebar>
)

export default Drawer