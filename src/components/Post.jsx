import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { useState } from 'react';

export function Post({author, publishedAt, content}) {
  const [comments, setComments] = useState([
    'Post muito Bacana em !'
  ])
  
  const publishedDateFormated = format(publishedAt,"d 'de' LLLL 'às' HH:mm'h'", {
    locale:ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale:ptBR,
    addSuffix:true
  })

  function handleCreateNewComment() {
    event.preventDefault();
    const {comment} = event.target
    setComments([...comments, comment.value]);
  }
  
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder={true} src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {
          content.map(line => {
            if(line.type === 'paragraph') {
              return <p>{line.content}</p>;
            } else if(line.type === 'link') {
              return <p><a>{line.content}</a></p>
            }
          })  
        }
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
        placeholder="Deixe seu comentário"
        name='comment'
        />
        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment content={comment} />
        })}
      </div>

    </article>
  );
}
