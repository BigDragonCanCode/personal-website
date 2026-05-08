import { sectionLinks } from '../data/portfolio'
import type { SectionId } from '../types/sections'

type ExplorerProps = {
  activeSection: SectionId
  onSelectSection: (section: SectionId) => void
}

export function Explorer({ activeSection, onSelectSection }: ExplorerProps) {
  return (
    <aside className="explorer" aria-label="Section explorer">
      <div className="pane-head">
        <span>Explorer</span>
        <span className="pane-kicker">portfolio-v2</span>
      </div>
      <div className="tree">
        <div className="tree-group">
          <div className="tree-label">src</div>
          {sectionLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={link.id === activeSection ? 'tree-item is-active' : 'tree-item'}
              onClick={() => onSelectSection(link.id)}
            >
              <span className="tree-name">{link.file}</span>
              <span className="tree-ext">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
