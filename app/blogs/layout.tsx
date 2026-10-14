import React from 'react'

const BlogsLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div>
            Blogs Layout Is Special Only FOr Blogs Route Or Nexted Routes Inside The Blogs Directory
            {children}
        </div>
    )
}

export default BlogsLayout
