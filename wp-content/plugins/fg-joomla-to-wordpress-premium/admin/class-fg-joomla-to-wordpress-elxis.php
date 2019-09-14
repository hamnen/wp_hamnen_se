<?php

/**
 * Elxis
 *
 * @link       https://www.fredericgilles.net/fg-joomla-to-wordpress/
 * @since      3.5.0
 *
 * @package    FG_Joomla_to_WordPress_Premium
 * @subpackage FG_Joomla_to_WordPress_Premium/admin
 */

if ( !class_exists('FG_Joomla_to_WordPress_Elxis', false) ) {

	/**
	 * Elxis features
	 *
	 * @package    FG_Joomla_to_WordPress_Premium
	 * @subpackage FG_Joomla_to_WordPress_Premium/admin
	 * @author     Frédéric GILLES
	 */
	class FG_Joomla_to_WordPress_Elxis extends FG_Joomla_to_WordPress_Joomla10 {

		/**
		 * Modify the query for get_posts
		 * 
		 * @since      3.5.0
		 * 
		 * @param string $sql SQL
		 * @param string $prefix Tables prefix
		 * @param string $extra_cols Extra columns
		 * @param string $extra_joins Extra joins
		 * @param int $last_joomla_id Last Joomla ID
		 * @param int $limit Limit
		 * @return string SQL
		 */
		public function get_posts_sql($sql, $prefix, $extra_cols, $extra_joins, $last_joomla_id, $limit) {
			if ( $this->plugin->column_exists('content', 'seotitle') ) {
				$sql = str_replace('p.alias', 'IF(p.seotitle <> "", p.seotitle, p.title) AS alias', $sql);
				$sql = str_replace('c.alias', 'c.name', $sql);
				$sql = str_replace('p.fulltext', 'p.maintext AS `fulltext`', $sql);
			}
			return $sql;
		}
	}
}
