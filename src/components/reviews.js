import { Avatar, Card, CardActions, CardContent, CardHeader, Paper, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { green } from '@material-ui/core/colors';
import Rate from './rate/index';

/**
 * Прошу прощения за неудобства в проверке
 * Очень хотелось попробовать material-ui прикрутить:)
 */
export default function Reviews({ reviews }) {
  return (
    <div>
      <Typography variant='h6' component='h1'>
        Отзывы
      </Typography>

      {reviews.map(({ id, user, text, rating }) => (

        <Paper elevation={3} variant='outlined'>
          <Card key={id}>
            <CardHeader
              avatar={<Avatar
                style={{ color: green[500] }}
                img={<Icon>user</Icon>}
              />}
              title={user}
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                {text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <Rate rating={rating} />
            </CardActions>
          </Card>
        </Paper>
      ))
      }
    </div>
  );
}
