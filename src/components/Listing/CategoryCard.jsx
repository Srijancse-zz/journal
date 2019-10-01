import React from 'react'
import styled from '@emotion/styled'
import { Icon } from 'knit-ui'
import { StyledLink } from '../Wrappers'
import { getCategoryFirstPost } from '../Wrappers'
import theme from '../../styles/theme'
import { firstCategory, secondCategory, thirdCategory } from '../../assets'

const { breakpoints } = theme

const CardWrapper = styled(StyledLink)`
  position: relative;
  display: inline-block;
  height: 37rem;
  background: #ebe7e0;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.5s ease;

  @media (max-width: ${breakpoints.mx}) {
    border-width: 0 8rem 8rem 0;
  }

  @media (max-width: ${breakpoints.m}) {
    height: 34rem;
  }

  @media (max-width: ${breakpoints.s}) {
    height: 30rem;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-width: 0 13rem 13rem 0;
    border-style: solid;
    border-color: ${props => categoryColors[props.uid]} #f4f2ed;

    @media (max-width: ${breakpoints.mx}) {
      border-width: 0 8rem 8rem 0;
    }

    @media (max-width: ${breakpoints.m}) {
      border-width: 0 14rem 14rem 0;
    }

    @media (max-width: ${breakpoints.s}) {
      border-width: 0 10rem 10rem 0;
    }
  }
  .arrow-icon {
    display: none;
  }
  &:hover {
    background-color: #e1dbd1;
    text-decoration: none !important;
    &:before {
      border-width: 0 11rem 11rem 0;
      transition: all 0.5s ease;
    }
    .arrow-icon {
      display: inline-block;
      margin-left: 1rem;
      margin-bottom: -0.7rem;
      width: 2.8rem;
      height: 2.8rem;
      svg {
        transform: translateY(5px) rotate(-135deg);
        width: 2.8rem;
        height: 2.8rem;
      }
    }
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 4rem;
  height: 100%;

  @media (max-width: ${breakpoints.s}) {
    padding: 2rem;
  }
  .title {
    font-size: 2.4rem;
    line-height: 2.9rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #000;
  }
  .num {
    margin-bottom: 1rem;

    @media (max-width: ${breakpoints.mx}) {
      width: 4rem;
    }
  }
  .desc {
    color: #666666;
    opacity: 0.8;
    font-size: 1.4rem;
    line-height: 2rem;
    height: 8rem;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-decoration: none;
  }
`

const categoryColors = {
  engineering: '#FCD06E',
  'business--growth': '#025C52',
  'product--design': '#813A4C',
}

const categoryIndex = {
  '0': firstCategory,
  '1': secondCategory,
  '2': thirdCategory,
}

const CategoryCard = ({ data, index, cardLink, className }) => {
  const {
    data: { title, description },
  } = data
  return (
    <CardWrapper
      state={{ sidebar: true }}
      to={cardLink}
      uid={data.uid}
      className={className}>
      <CardContent>
        <span className="num">
          <img src={categoryIndex[index]} alt="" />
          <Icon height="20px" type="oArrowDownward" className="arrow-icon" />
        </span>
        <span className="title">{title.text}</span>
        <span className="desc">{description.text}</span>
      </CardContent>
    </CardWrapper>
  )
}

export default CategoryCard
