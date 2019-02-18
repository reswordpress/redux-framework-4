<?php
/**
 * Redux Framework Instance Container Class
 * Automatically captures and stores all instances
 * of ReduxFramework at instantiation.
 *
 * @package     Redux_Framework/Classes
 * @subpackage  Core
 */

defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'Redux_Instances', false ) ) {

	/**
	 * Class Redux_Instances
	 */
	class Redux_Instances {

		/**
		 * ReduxFramework instances
		 *
		 * @var ReduxFramework[]
		 */
		private static $instances;

		/**
		 * Get Instance
		 * Get Redux_Instances instance
		 * OR an instance of ReduxFramework by [opt_name]
		 *
		 * @param  string|false $opt_name the defined opt_name.
		 *
		 * @return ReduxFramework class instance
		 */
		public static function get_instance( $opt_name = false ) {

			if ( $opt_name && ! empty( self::$instances[ $opt_name ] ) ) {
				return self::$instances[ $opt_name ];
			}

			return null;
		}

		/**
		 * Get all instantiated ReduxFramework instances (so far)
		 *
		 * @return [type] [description]
		 */
		public static function get_all_instances() {
			return self::$instances;
		}

		/**
		 * Redux_Instances constructor.
		 *
		 * @param mixed $redux_framework Is object.
		 */
		public function __construct( $redux_framework = false ) {
			if ( false !== $redux_framework ) {
				$this->store( $redux_framework );
			} else {
				add_action( 'redux/construct', array( $this, 'store' ), 5, 1 );
			}
		}

		/**
		 * Action hook callback.
		 *
		 * @param object $redux_framework Pointer.
		 */
		public function store( $redux_framework ) {
			if ( $redux_framework instanceof ReduxFramework ) {
				$key                     = $redux_framework->args['opt_name'];
				self::$instances[ $key ] = $redux_framework;
			}
		}
	}
}

if ( ! class_exists('ReduxFrameworkInstances') ) {
	class_alias( 'Redux_Instances', 'ReduxFrameworkInstances' );
}
