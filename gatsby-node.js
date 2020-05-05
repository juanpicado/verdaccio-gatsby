/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');

exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/docPage.js')

    resolve(
      graphql(
        `
          query {
						allMarkdownRemark {
							edges {
								node {
									id
									frontmatter {
										title
									}
									html
								}
							}
						}
          }
        `
      ).then(result => {
        const posts = result.data.allMarkdownRemark.edges

        // createTagPages(createPage, posts)
				// console.log("-nposts-", posts);

        posts.forEach(({node}, index) => {
					console.log("-node.frontmatter-", node.frontmatter);
					const title = node.frontmatter.title;
					if (!title || title === '') {
						return;
					}

					const id = node.id;
          createPage({
            path: title,
            component: blogPostTemplate,
            context: {
							id
              // prev: index === 0 ? null : posts[index - 1].node,
              // next: index === (posts.length - 1) ? null : posts[index + 1].node
            }
          })

          resolve()
        })
      })
    )
  })
})