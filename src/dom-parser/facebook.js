export default class Facebook {
  constructor() {
    
    /* include Linkedin icon style */
    document.head.insertAdjacentHTML(
      'beforeend',
      `<style>.linkedin-logo{color: var(--blue-70,#0073b1); width: 1.2rem; height: 1.2rem } a.linkedin-link:hover {text-decoration: none;}</style>`,
    )
    this.registerObserver()

    if (this.validateUrl()) {
      setTimeout(this.processDom(), 500);
    }
  }

  validateUrl() {
    const is_valid_url = window.location.href.includes('/members')
    return is_valid_url
  }

  processDom(dom_element_to_process) {
    let element = dom_element_to_process ? dom_element_to_process : document

    let block_of_members = element.getElementsByClassName('b20td4e0')
    for (let i = 0; i < block_of_members.length; i++) {
      let list_of_members = block_of_members[i].getElementsByClassName(
        'ue3kfks5',
      )

      /* sanitize */
      if (!list_of_members || typeof list_of_members.childNodes === undefined)
        continue

      for (let j = 0; j < list_of_members.length; j++) {
        let item_of_members = list_of_members[j].getElementsByClassName(
          'nc684nl6',
        )

        if (item_of_members) {
          this.insertLinkedinLink(item_of_members[1])
        }
      }
    }
  }

  registerObserver() {
    let observer = new MutationObserver((mutations) => {
      /* sanitize */
      if (!this.validateUrl()) return

      for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
          if (
            addedNode.nodeName == 'DIV' &&
            addedNode.classList &&
            (addedNode.classList.contains('l9j0dhe7') ||
              addedNode.classList.contains('jei6r52m'))
          ) {
            this.processDom(addedNode)
          }
          if (
            addedNode.nodeName == 'DIV' &&
            addedNode.getAttribute('data-visualcompletion') == 'ignore-dynamic'
          ) {
            let list_of_members = addedNode.getElementsByClassName(
              'nc684nl6',
            )[1]
            this.insertLinkedinLink(list_of_members.childNodes[0])
          }
        }
      }
    })
    observer.observe(document, { childList: true, subtree: true })
  }

  insertLinkedinLink(member_div) {
    /* sanitize */
    if (!member_div) {
      return
    }

    let member_name = member_div.innerText

    if (!member_name) {
      return
    }

    /* avoide duplicate icon */
    if (
      member_div.nextSibling &&
      member_div.nextSibling.classList &&
      member_div.nextSibling.classList.contains('linkedin-link')
    ) {
      return
    }

    member_div.insertAdjacentHTML(
      'afterend',
      `<a class="linkedin-link" href="https://www.linkedin.com/search/results/people/?keywords=${member_name}" 
          title="Search ${member_name}'s LinkedIn" target="_blank" onClick="this.style.opacity=0.2"
      >
          <span class="padding--right-half text--secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" class="linkedin-logo">
                  <title>Search ${member_name}'s LinkedIn</title>
                      <g>
                          <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34H2.5A2.5,2.5,0,0,1,0,31.5V2.5A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,13H5V29h5Zm.45-5.5A2.88,2.88,0,0,0,7.59,4.6H7.5a2.9,2.9,0,0,0,0,5.8h0a2.88,2.88,0,0,0,2.95-2.81ZM29,19.28c0-4.81-3.06-6.68-6.1-6.68a5.7,5.7,0,0,0-5.06,2.58H17.7V13H13V29h5V20.49a3.32,3.32,0,0,1,3-3.58h.19c1.59,0,2.77,1,2.77,3.52V29h5Z" fill="currentColor"></path>
                      </g> 
              </svg>
          </span>
      </a>`,
    )
  }
}
