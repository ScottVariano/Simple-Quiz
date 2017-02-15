<?php get_header(); ?>

  <div class="container main-contain">   
    <div class="row">
      <div class="col-md-12">

      <?php $args = array(
        'p' => 16,
        'post_type' => 'quiz'
      );
      $the_query = new WP_Query( $args ); ?>
      <?php if ( $the_query->have_posts() ) : while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

      <?php
      // Begin building progress bar that sits above the questions
      $panelCount = 0;

      $progBar = '<ul id="progressbar">';
      $progBar .= '<li class="active"></li>';
      $fieldsets = '<fieldset>';
      $fieldsets .= '<p><img src="' . get_field('quiz_image') . '" /></p>';
      $fieldsets .= get_field('quiz_intro');
      $fieldsets .= '<input type="button" name="next" class="next action-button prog-' . $panelCount . '" value="Start the Quiz &raquo;" />';
      $fieldsets .= '</fieldset>';

      if( have_rows('quiz_container') ): while ( have_rows('quiz_container') ) : the_row();

        // Build a separate panel for each question
        $fieldsets .= '<fieldset class="question-panel" data-panel="' . $panelCount . '">';
        $fieldsets .= '<h2 class="fs-title">Q:</h2>';
        $fieldsets .= '<h3 class="fs-subtitle">';
        $fieldsets .= get_sub_field('question');
        $fieldsets .= '</h3>';
        $fieldsets .= '<ul class="radio-list">';

        // Set answer count to zero for each new question
        $ansCount = 0;
        $activeClass = '';

        $progBar .= '<li></li>';

        if( have_rows('answers_container') ): while ( have_rows('answers_container') ) : the_row();

          // Build list of answers for current question / panel
          $fieldsets .= '<li>';
          $fieldsets .= '<input type="radio" id="' . $panelCount . $ansCount . '-option" name="selector">';
          $fieldsets .= '<label for="' . $panelCount . $ansCount . '-option">';
          $fieldsets .= get_sub_field('answer');
          $fieldsets .= '</label>';
          $fieldsets .= '<div class="check"></div>';
          $fieldsets .= '</li>';

          $ansCount++;

        endwhile; endif;

        $fieldsets .= '</ul>';

        // if(($panelCount + 1) != $totalQuestions) {
        $fieldsets .= '<input type="button" name="next" class="next action-button prog-' . $panelCount . '" value="Next &raquo;" style="display:none;" />';
        // } else {
        //  $fieldsets .= '<input type="button" name="next" class="next action-button prog-' . $panelCount . '" value="See My Results" style="display:none;" />';
        //      }
        $fieldsets .= '</fieldset>';
        $panelCount++;

        endwhile; endif;

        $progBar .= '<li></li>';
        $progBar .= '</ul>';
        $fieldsets .= '<fieldset>';
        $fieldsets .= '<h2 class="final-score">&nbsp;</h2>';
        $fieldsets .= get_field('quiz_outro');
        $fieldsets .= '<div class="row signup-row">';
        $fieldsets .= '<div class="col-xs-8 col-sm-9">';
        $fieldsets .= '<input placeholder="Email Address" type="text" />';
        $fieldsets .= '</div><div class="col-xs-4 col-sm-3">';
        $fieldsets .= '<input type="button" class="action-button signup-button" value="Sign Up" />';
        $fieldsets .= '</div></div>';
        $fieldsets .= '</fieldset>';

        endwhile; endif; ?>

            <!-- multistep form -->
            <form id="msform">
              <?php echo $progBar; ?>
              <?php echo $fieldsets; ?>
          </form>

      </div>
    </div>
  </div>

<?php get_footer(); ?>
