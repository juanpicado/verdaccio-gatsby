import React from 'react'
import { graphql, Link } from 'gatsby'

const Template = ({data, pageContext}) => {
	const {next, prev} = pageContext;
	console.log("data-->", data);

  const {markdownRemark} = data
  const title = markdownRemark.frontmatter.title;
  const html = markdownRemark.html
  return (
    <div>
      <h1 style={{fontFamily: 'avenir'}}>{title}</h1>
      <div className='blogpost'
        dangerouslySetInnerHTML={{__html: html}}
        style={{
          fontFamily: 'avenir'
        }}
      />

			</div>
  )
}

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: {eq: $id}) {
			id
			fileAbsolutePath
			html
			frontmatter {
				title
			}
    }
  }
`

export default Template
