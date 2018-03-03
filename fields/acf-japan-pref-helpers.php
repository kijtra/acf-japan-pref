<?php

class acf_japan_pref_helpers {

    /**
     * Get field defaults
     *
     * @return array
     */
    public static function get_defaults() {
        return array(
            'multiple'      =>	0,
            'allow_null'    =>	0,
            'choices'       =>	array(),
            'default_value' => '',
            'ui'            => 1,
            'return_format' => 'array',
            'placeholder'   => __('Select a prefecture', 'acf-japan-pref'),
        );
    }

    public static function get_prefs()
    {
        $pref_ids = array(
            '01' => '北海道', '02' => '青森県', '03' => '岩手県', '04' => '宮城県', '05' => '秋田県',
            '06' => '山形県', '07' => '福島県', '08' => '茨城県', '09' => '栃木県', '10' => '群馬県',
            '11' => '埼玉県', '12' => '千葉県', '13' => '東京都', '14' => '神奈川県', '15' => '新潟県',
            '16' => '富山県', '17' => '石川県', '18' => '福井県', '19' => '山梨県', '20' => '長野県',
            '21' => '岐阜県', '22' => '静岡県', '23' => '愛知県', '24' => '三重県', '25' => '滋賀県',
            '26' => '京都府', '27' => '大阪府', '28' => '兵庫県', '29' => '奈良県', '30' => '和歌山県',
            '31' => '鳥取県', '32' => '島根県', '33' => '岡山県', '34' => '広島県', '35' => '山口県',
            '36' => '徳島県', '37' => '香川県', '38' => '愛媛県', '39' => '高知県', '40' => '福岡県',
            '41' => '佐賀県', '42' => '長崎県', '43' => '熊本県', '44' => '大分県', '45' => '宮崎県',
            '46' => '鹿児島県', '47' => '沖縄県',
        );
        return $pref_ids;
    }

    /**
     * Render field
     *
     * @param  array $field
     */
    public static function render_field( $field ) {
        $prefs = self::get_prefs();
        $field['choices'] = $prefs;
        $attrs = array(
            'id'				=> $field['id'],
            'class'				=> $field['class'],
            'name'				=> $field['name'],
            'data-ui'			=> $field['ui'],
            'data-multiple'		=> $field['multiple'],
            'data-placeholder'	=> $field['placeholder'],
            'data-allow-null'	=> $field['allow_null'] ? 1 : 0,
        );
        $attrs['class'] .=  ' acf-japan-pref';
        // trim value
        $field['value'] = is_array($field['value']) ? array_map('trim', $field['value']) : trim($field['value']);
        if( $field['multiple'] ) {
            $attrs['name']     .= '[]';
            $attrs['multiple'] = 'multiple';
            $attrs['size']     = 5;
        }
        // create Field HTML
        ?>
        <select <?php echo implode( ' ', array_map(function($val, $key) { return sprintf( '%1$s="%2$s"', $key, esc_attr($val) ); }, $attrs, array_keys( $attrs ))); ?>>
            <?php if( $field['allow_null'] ): ?>
            <option value=""><?php if( !$field['ui'] ): ?>- <?php esc_html_e('Select a prefecture', 'acf-japan-pref'); ?> -<?php endif; ?></option>
            <?php endif; ?>
            <?php if( is_array($field['choices']) ): ?>
            <?php foreach($field['choices'] as $code => $pref): ?>
            <option value="<?php echo esc_attr($code); ?>" <?php selected( $field['multiple'] && is_array($field['value']) ? in_array($code, $field['value'], true) : $code === $field['value'] ); ?>><?php echo esc_html($pref); ?></option>
            <?php endforeach; ?>
            <?php endif; ?>
        </select>
        <?php
    }
    
    /**
     * Format value
     *
     * @param  string|array $value
     * @param  array $field
     * @return string|array
     */
    public static function format_value( $value, $field ) {
        $prefs = self::get_prefs();
        if( is_array($value) ) {
            // default to array
            $value = array_filter($prefs, function($k) use($value) {
                return in_array($k, $value, true);
            }, ARRAY_FILTER_USE_KEY);
            // name
            if( $field['return_format'] === 'name' ) {
                $value = array_values($value);
            }
            // code
            if( $field['return_format'] === 'code' ) {
                $value = array_keys($value);
            }
        } else {
            $pref_name = isset($prefs[$value]) ? $prefs[$value] : $value;
            // name
            if( $field['return_format'] === 'name' ) {
                $value = $pref_name;
            }
            // array
            if( $field['return_format'] === 'array' ) {
                $value = array( $value => $pref_name );
            }
        }
        // return
        return $value;
    }
}
