import React, { Component } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Bio from '../components/bio';
import Post from '../components/post';
import media from '../utils/media';

const Title = styled.h3`
  color: var(--color-grey-light);
  font-weight: 200;
  font-size: 2.6rem;
  margin: 2rem 0 0;

  ${media.phone`
    margin: 3rem 0 0;
  `}
`;
const Main = styled.main`
  margin-top: 5rem;
`;

class BlogIndex extends Component {
  render() {
    const { data } = this.props;
    const posts = data.allMarkdownRemark.edges;

    return (
      <Layout>
        <SEO
          title="All Posts"
          keywords={[`f1v`, `blog`, `react`, `javascript`]}
        />
        <Bio />
        <Main>
          <Title>Latest Posts</Title>
          {posts.map(({ node }) => {
            return <Post key={node.id} node={node} />;
          })}
        </Main>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
