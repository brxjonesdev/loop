import React from 'react'

export default function ProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>Project ID: {params.id}</div>
  )
}
