export default function Rate({ value }) {
  
  let items = []
  
  for ( let i = 1; i <= value; i++ ) {
    items.push(<span key={i}><object data="/Orange_star.svg" width="30" height="30"> </object></span>);
  }  
  return (
    <div>
      {items}
    </div>
  );
}
