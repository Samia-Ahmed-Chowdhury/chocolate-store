import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'

function TitleHalmet({dynamicTitle}) {

    return (
        <Helmet>
            <title>{dynamicTitle}</title>
            <meta name="description" content="Nested component" />
        </Helmet>
    )
}

export default TitleHalmet