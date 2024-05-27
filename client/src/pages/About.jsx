import React from 'react'
import { NavLink} from 'react-router-dom'

export default function About() {
  return (
    <>
        <div className='about-title' style={{paddingTop: 30}}>
            <h1>Read Me</h1>
        </div>
        <div className='description-container'>
            <h2 className='description' style={{marginLeft: 10, marginRight: 10, paddingBottom: 100}}>
            Read Me was designed to be a Tarot Card Reading Application that allows users to learn the joys, wonders, and intricacies of reading Tarot Cards.
            <br /><br />Due to the fact that the original version of the Rider–Waite Tarot (illustrated by "Pixie" aka Pamela Coleman Smith) is in the public domain in all countries that have a copyright term of 70 years or fewer after the death of the last co-author, that is the deck used by this site.
            <br /><br />However, it is imperative to note that the Rider-Waite deck was published over 100 years ago and is inherently steeped in heteronormativity and monarchistic hierarchy.  It is, therefore, vital to look past the meanings derived from the published booklet to more inclusive and varied meanings.
            <br /><br />Please support indie Tarot Decks made by queer artists and artists of color and purchase from independent bookstores and mystical shops if possible.  Links to resources can be found on the <NavLink to='/resources'>Resources</NavLink>  page.
            <br /><br />All data and images of the Rider-Waite Tarot was used under the MIT License from Daria Chemkaeva's open source project found <a href='https://www.kaggle.com/datasets/lsind18/tarot-json'>here</a>
            </h2>
        </div>
    </>
  )
}
